import { Component } from '@angular/core';
import { ElectronService } from './services/electron.service';
import { MetamaskService } from './services/metamask.service';
import { ContractsService } from './services/contracts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Exodia.World';
  recipientAddress: string;
  etherAmount: number = 0;

  constructor(
    private electronService: ElectronService,
    private metamaskService: MetamaskService,
    private contractsService: ContractsService
  ) {
  }

  onSendEther(): void {
    this.contractsService.sendEther(this.recipientAddress, this.etherAmount);
  }

  onOpenMetamaskPopup(): void {
    if (this.electronService.isRunning()) {
      this.metamaskService.openPopup();
    }
  }

  onCloseMetamaskPopup(): void {
    if (this.electronService.isRunning()) {
      this.metamaskService.closePopup();
    }
  }

  onOpenMetamaskNotification(): void {
    if (this.electronService.isRunning()) {
      this.metamaskService.openNotification();
    }
  }

  onCloseMetamaskNotification(): void {
    if (this.electronService.isRunning()) {
      this.metamaskService.closeNotification();
    }
  }
}
