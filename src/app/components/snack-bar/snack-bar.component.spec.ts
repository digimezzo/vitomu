import { SnackBarComponent } from './snack-bar.component';
import { IMock, Mock } from 'typemoq';
import { SnackBarService } from '../../services/snack-bar/snack-bar.service';

describe('SnackBarComponent', () => {
    let snackBarServiceMock: IMock<SnackBarService>;

    beforeEach(() => {
        snackBarServiceMock = Mock.ofType<SnackBarService>();
    });
    
    describe('constructor', () => {
        it('should create', () => {
            // Arrange

            // Act
            const component: SnackBarComponent = new SnackBarComponent(snackBarServiceMock.object);

            // Assert
            expect(component).toBeDefined();
        });
    });
});
