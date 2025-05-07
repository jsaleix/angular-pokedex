import {
  Component,
  ElementRef,
  input,
  output,
  viewChild,
  effect,
  inject,
} from '@angular/core';
import { SearchPkmComponent } from '../search-pkm/search-pkm.component';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-search-pkm-modal',
  imports: [SearchPkmComponent],
  templateUrl: './search-pkm-modal.component.html',
  styleUrl: './search-pkm-modal.component.css',
})
export class SearchPkmModalComponent {
  private dialogRef =
    viewChild<ElementRef<HTMLDialogElement>>('searchPkmModal');
  router = inject(Router);
  modalState = input(false);
  onCloseModal = output();

  constructor() {
    effect(() => {
      if (this.modalState()) {
        this.dialogRef()?.nativeElement.showModal();
      }
    });
    effect(() => {
      this.router.events
        .pipe(filter((event) => event instanceof NavigationStart))
        .subscribe(() => {
          this.closeModal();
        });
    });
  }

  closeModal() {
    this.dialogRef()?.nativeElement.close();
    this.onCloseModal.emit();
  }
}
