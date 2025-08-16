export interface UserDescriptor {
  label: string;
  descriptors: number[][]; // Multiple descriptors per user
  createdAt: number;
}

export interface StorageData {
  users: UserDescriptor[];
  version: number;
}

class FaceGuardStorage {
  private dbName = 'faceguard-db';
  private storeName = 'users';
  private version = 1;
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve) => {
      if (!('indexedDB' in window)) {
        console.warn('IndexedDB not supported, falling back to localStorage');
        resolve();
        return;
      }

      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => {
        console.warn('IndexedDB error, falling back to localStorage:', request.error);
        resolve();
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'label' });
          store.createIndex('createdAt', 'createdAt', { unique: false });
        }
      };
    });
  }

  async saveUser(user: UserDescriptor): Promise<void> {
    if (this.db) {
      return this.saveUserIndexedDB(user);
    } else {
      return this.saveUserLocalStorage(user);
    }
  }

  async getUsers(): Promise<UserDescriptor[]> {
    if (this.db) {
      return this.getUsersIndexedDB();
    } else {
      return this.getUsersLocalStorage();
    }
  }

  async deleteUser(label: string): Promise<void> {
    if (this.db) {
      return this.deleteUserIndexedDB(label);
    } else {
      return this.deleteUserLocalStorage(label);
    }
  }

  async clearAll(): Promise<void> {
    if (this.db) {
      return this.clearAllIndexedDB();
    } else {
      return this.clearAllLocalStorage();
    }
  }

  async exportData(): Promise<StorageData> {
    const users = await this.getUsers();
    return {
      users,
      version: this.version
    };
  }

  async importData(data: StorageData): Promise<void> {
    await this.clearAll();
    for (const user of data.users) {
      await this.saveUser(user);
    }
  }

  // IndexedDB methods
  private async saveUserIndexedDB(user: UserDescriptor): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.put(user);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  private async getUsersIndexedDB(): Promise<UserDescriptor[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  private async deleteUserIndexedDB(label: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(label);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  private async clearAllIndexedDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // LocalStorage methods (fallback)
  private async saveUserLocalStorage(user: UserDescriptor): Promise<void> {
    const users = this.getUsersLocalStorageSync();
    const existingIndex = users.findIndex(u => u.label === user.label);
    
    if (existingIndex >= 0) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }
    
    localStorage.setItem('faceguard-users', JSON.stringify(users));
  }

  private async getUsersLocalStorage(): Promise<UserDescriptor[]> {
    return this.getUsersLocalStorageSync();
  }

  private getUsersLocalStorageSync(): UserDescriptor[] {
    try {
      const data = localStorage.getItem('faceguard-users');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error parsing localStorage data:', error);
      return [];
    }
  }

  private async deleteUserLocalStorage(label: string): Promise<void> {
    const users = this.getUsersLocalStorageSync();
    const filtered = users.filter(u => u.label !== label);
    localStorage.setItem('faceguard-users', JSON.stringify(filtered));
  }

  private async clearAllLocalStorage(): Promise<void> {
    localStorage.removeItem('faceguard-users');
  }
}

export const storage = new FaceGuardStorage();
