import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationServiceBase } from '../../services/notification/notification.service.base';
import { NotificationData } from '../../services/notification/notification-data';
import { DocumentProxy } from '../../common/io/document-proxy';

@Component({
    selector: 'app-notification-bar',
    templateUrl: './notification-bar.component.html',
    styleUrls: ['./notification-bar.component.scss'],
    animations: [
        trigger('expandCollapse', [
            state('collapsed', style({ height: '0', overflow: 'hidden' })),
            state('expanded', style({ height: '30px' })),
            transition('collapsed => expanded', animate('150ms ease-in')),
            transition('expanded => collapsed', animate('150ms ease-out')),
        ]),
    ],
})
export class NotificationBarComponent implements OnInit {
    private subscription: Subscription = new Subscription();

    public constructor(
        private notificationService: NotificationServiceBase,
        private documentProxy: DocumentProxy,
    ) {}

    public notificationData: NotificationData | undefined = undefined;

    public ngOnInit(): void {
        this.subscription.add(
            this.notificationService.showNotification$.subscribe((notificationData: NotificationData) => {
                this.showNotification(notificationData);
            }),
        );

        this.subscription.add(
            this.notificationService.dismissNotification$.subscribe(() => {
                this.dismissNotification();
            }),
        );

        if (this.notificationService.hasNotificationData) {
            this.showNotification(this.notificationService.notificationData!);
        }
    }

    public isExpanded = false;

    public dismiss(): void {
        this.notificationService.dismiss();
    }

    private showNotification(notificationData: NotificationData): void {
        this.notificationData = notificationData;
        const element: HTMLElement = this.documentProxy.getDocumentElement();
        element.style.setProperty('--notification-bar-correction', '30px');
        this.isExpanded = true;
    }

    private dismissNotification(): void {
        const element: HTMLElement = this.documentProxy.getDocumentElement();
        element.style.setProperty('--notification-bar-correction', '0px');
        this.isExpanded = false;
    }
}
