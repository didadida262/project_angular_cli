import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  // 主题设置
  isDarkMode = signal(false);
  
  // 语言设置
  currentLanguage = signal('zh-CN');
  languages = [
    { code: 'zh-CN', name: '简体中文' },
    { code: 'en-US', name: 'English' }
  ];
  
  // 通知设置
  notifications = signal({
    email: true,
    push: false,
    sms: false
  });

  toggleDarkMode(): void {
    this.isDarkMode.update(v => !v);
    // 这里可以实现主题切换逻辑
    if (this.isDarkMode()) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  changeLanguage(lang: string): void {
    this.currentLanguage.set(lang);
    // 这里可以实现语言切换逻辑
    console.log('切换语言到:', lang);
  }

  updateNotification(type: 'email' | 'push' | 'sms', value: boolean): void {
    this.notifications.update(n => ({ ...n, [type]: value }));
  }

  saveSettings(): void {
    console.log('保存设置:', {
      darkMode: this.isDarkMode(),
      language: this.currentLanguage(),
      notifications: this.notifications()
    });
    alert('设置已保存！');
  }

  resetSettings(): void {
    this.isDarkMode.set(false);
    this.currentLanguage.set('zh-CN');
    this.notifications.set({
      email: true,
      push: false,
      sms: false
    });
    document.body.classList.remove('dark-theme');
    alert('设置已重置！');
  }
}

