
import { User } from '../types';

class NotificationService {
  private registration: ServiceWorkerRegistration | null = null;

  async init() {
    if ('serviceWorker' in navigator) {
      try {
        this.registration = await navigator.serviceWorker.ready;
        console.log('NotificationService: Service Worker ready');
      } catch (err) {
        console.error('NotificationService: Failed to get SW registration', err);
      }
    }
  }

  async requestPermission(): Promise<'granted' | 'denied' | 'default'> {
    if (!('Notification' in window)) {
      console.warn('Notifications not supported');
      return 'denied';
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        // Send a confirmation notification
        await this.sendNotification('Notifications activées !', {
          body: 'Vous recevrez désormais des rappels pour pratiquer votre allemand.',
          tag: 'welcome-notification'
        });
      }
      return permission;
    } catch (err) {
      console.error('Failed to request permission', err);
      return 'denied';
    }
  }

  async sendNotification(title: string, options?: NotificationOptions) {
    if (Notification.permission !== 'granted') return;

    if (!this.registration && 'serviceWorker' in navigator) {
      try {
        this.registration = await navigator.serviceWorker.ready;
      } catch (err) {
        console.error('NotificationService: Registration failed on demand', err);
      }
    }

    if (this.registration) {
      try {
        await this.registration.showNotification(title, {
          icon: 'https://cdn-icons-png.flaticon.com/512/3079/3079165.png',
          badge: 'https://cdn-icons-png.flaticon.com/512/3079/3079165.png',
          ...options
        } as any);
      } catch (err) {
        console.error('NotificationService: SW notification failed', err);
        new Notification(title, options);
      }
    } else {
      new Notification(title, options);
    }
  }

  scheduleReminders(user: User | null) {
    if (!user || !user.notificationsEnabled || user.reminderFrequency === 'none') {
      this.clearReminders();
      return;
    }

    // Since we don't have a backend, we'll use a simple interval while the app is open
    // and try to use the Service Worker for background if possible (though limited without push)
    
    // Clear existing
    this.clearReminders();

    // Example: Daily reminder logic
    // In a real app, this would be handled by a server sending push notifications
    // Here we simulate it by checking last activity
    const now = Date.now();
    const lastActivity = user.lastActivityTimestamp || now;
    const dayInMs = 24 * 60 * 60 * 1000;
    
    if (user.reminderFrequency === 'daily') {
      const timeSinceLast = now - lastActivity;
      if (timeSinceLast > dayInMs) {
        this.sendNotification('Prêt pour votre dose d\'allemand ?', {
          body: 'Revenez pratiquer vos mots composés aujourd\'hui !',
          tag: 'daily-reminder'
        });
      }
    }
  }

  private clearReminders() {
    // Logic to clear scheduled tasks if any
  }
}

export const notificationService = new NotificationService();
