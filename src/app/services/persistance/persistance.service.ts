import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PersistanceService {
    public dependenciesAreChecked: boolean = false;
}
