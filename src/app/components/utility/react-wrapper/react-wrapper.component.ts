import { loadRemoteModule } from '@angular-architects/module-federation';
import { AfterContentInit, Component, Input, OnDestroy } from '@angular/core';
import { SharedService } from '../../../services/shared/shared.service';
import { ReactModule } from '../../../model/reactModule';

@Component({
  selector: 'app-react-wrapper',
  templateUrl: './react-wrapper.component.html',
  styleUrl: './react-wrapper.component.scss',
})
export class ReactWrapperComponent implements AfterContentInit, OnDestroy {
  @Input() remoteEntry: string = '';
  @Input() remoteName: string = '';
  @Input() exposedModule: string = '';

  private rootElement: HTMLElement | null = null;
  private reactModule: ReactModule | null = null;

  constructor(public sharedService: SharedService) {}

  ngAfterContentInit() {
    this.loadRemoteModule();
  }

  private async loadRemoteModule() {
    if (!this.remoteEntry || !this.remoteName || !this.exposedModule) {
      console.error('remoteEntry, remoteName, or exposedModule is not defined');
      return;
    }

    try {
      this.reactModule = await loadRemoteModule({
        type: 'script',
        remoteEntry: this.remoteEntry,
        remoteName: this.remoteName,
        exposedModule: this.exposedModule,
      });

      this.rootElement = document.getElementById('root');

      this.sharedService.mount(this.rootElement, this.reactModule);
    } catch (error) {
      console.error('Error loading remote module', error);
    }
  }

  ngOnDestroy() {
    this.sharedService.unMount(this.rootElement, this.reactModule);
  }
}
