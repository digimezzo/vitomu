import { TransparentButtonComponent } from './transparent-button.component';

describe('TransparentButtonComponent', () => {
    let component: TransparentButtonComponent;

    beforeEach(() => {
        component = new TransparentButtonComponent();
    });

    describe('constructor', () => {
        it('should create', () => {
            // Assert
            expect(component).toBeDefined();
        });
    });
});
