import React from 'react';
import { render, screen } from '@testing-library/react';
import DeviceRegisterView from '../views/device_register_view';
import '@testing-library/jest-dom';

jest.mock('../components/shared/navigation_bar',
                              () => () => <div>Mocked NavigationBar</div>);
jest.mock('../components/device_register/device_register_grid',
                              () => () => <div>Mocked DeviceGrid</div>);

describe('DeviceRegisterView Component', () => {
    test('render Navbar, header, and DeviceGrid correctly', () => {

        render(<DeviceRegisterView />);

        expect(screen.getByText('Mocked NavigationBar')).toBeInTheDocument();
        expect(screen.getByText('Device Register')).toBeInTheDocument();
        expect(screen.getByText('Mocked DeviceGrid')).toBeInTheDocument();
    });

    test('renders the header text with correct styles', () => {

        render(<DeviceRegisterView />);

        const ViewTitle = screen.getByText('Device Register');
        expect(ViewTitle).toHaveStyle({
            fontSize: 'clamp(1.5rem, 5vw, 2.4rem)',
            textAlign: 'center',
            marginTop: '64px', // 8*8px
            marginBottom: '24px', // 3*8px
        });
    });
});
