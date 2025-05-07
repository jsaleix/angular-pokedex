import {
  Component,
  ElementRef,
  input,
  output,
  viewChild,
  effect,
} from '@angular/core';
import { SearchPkmComponent } from '../search-pkm/search-pkm.component';

@Component({
  selector: 'app-search-pkm-modal',
  imports: [SearchPkmComponent],
  templateUrl: './search-pkm-modal.component.html',
  styleUrl: './search-pkm-modal.component.css',
})
export class SearchPkmModalComponent {
  private dialogRef =
    viewChild<ElementRef<HTMLDialogElement>>('searchPkmModal');
  modalState = input(false);
  onCloseModal = output();

  constructor() {
    effect(() => {
      if (this.modalState()) {
        this.dialogRef()?.nativeElement.showModal();
      }
    });
  }

  closeModal() {
    this.dialogRef()?.nativeElement.close();
    this.onCloseModal.emit();
  }
}
