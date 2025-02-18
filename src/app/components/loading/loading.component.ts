import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  imports: [NgIf, AsyncPipe],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  standalone: true
})
export class LoadingComponent {
  constructor(public loadingService: LoadingService) {}

}
