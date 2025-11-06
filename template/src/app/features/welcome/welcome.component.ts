import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  projectName = '{{projectName}}';
  version = '1.0.0';
  
  features = [
    {
      icon: '🚀',
      title: '快速开发',
      description: '基于Angular最佳实践，开箱即用的项目结构'
    },
    {
      icon: '📦',
      title: '模块化设计',
      description: 'Core、Shared、Features模块清晰分离'
    },
    {
      icon: '🎨',
      title: '现代UI',
      description: '美观的用户界面和流畅的用户体验'
    },
    {
      icon: '🛠️',
      title: '完善配置',
      description: 'TypeScript、ESLint、Prettier全面配置'
    }
  ];

  resources = [
    { name: 'Angular 文档', url: 'https://angular.io/docs' },
    { name: 'Angular CLI', url: 'https://angular.io/cli' },
    { name: 'RxJS 文档', url: 'https://rxjs.dev/' },
    { name: 'TypeScript 文档', url: 'https://www.typescriptlang.org/docs/' }
  ];
}

