import { CommonModule } from '@angular/common';

import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
@Component({
  selector: 'app-qa',
  standalone: true,
   imports: [CommonModule, RouterModule],
  // imports: [CommonModule, RouterModule] ,
  templateUrl: './qa.component.html',
  styleUrl: './qa.component.css'
})
export class QaComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.activatedRoute.data.subscribe((data: any) => {
        const title = data.title || 'Titre par défaut';
        document.title = ` ${title}`;
      });
    }
  }

}
