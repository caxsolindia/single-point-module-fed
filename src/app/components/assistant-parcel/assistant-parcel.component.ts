import { AfterContentInit, Component, OnDestroy } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from '../../../environments/environment.dev';
import { SharedService } from '../../services/shared/shared.service';
import { ReactModule } from '../../model/reactModule';

@Component({
  selector: 'app-assistant-parcel',
  templateUrl: './assistant-parcel.component.html',
  styleUrl: './assistant-parcel.component.scss',
})
export class AssistantParcelComponent implements AfterContentInit, OnDestroy {
  private rootElement: HTMLElement | null = null;
  private reactModule: ReactModule | null = null;
  public environment = environment;

  constructor(public sharedService: SharedService) {}

  ngAfterContentInit() {
    this.loadRemoteModule();
  }

  private async loadRemoteModule() {
    this.reactModule = await loadRemoteModule({
      type: 'script',
      remoteEntry: environment.assistantParcelUrl,
      remoteName: environment.assistantParcelRemoteName,
      exposedModule: environment.assistantParcelExpoModule,
    });

    this.rootElement = document.getElementById('rootAP');

    this.sharedService.mount(this.rootElement, this.reactModule);
  }

  ngOnDestroy() {
    this.sharedService.unMount(this.rootElement, this.reactModule);
  }
}
