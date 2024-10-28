import React from 'react';
import { render, screen } from '@testing-library/react';
import EventGrid from '../components/event_view_components/event_grid';
import useFetchData from '../components/shared/fetch_data';
import '@testing-library/jest-dom';

jest.mock('../components/shared/fetch_data');

describe('DeviceRegisterGrid Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('displays loading message when fetching data', () => {
        useFetchData.mockReturnValue({ data: [], loading: true, error: null });

        render(<EventGrid />);

        expect(screen.getByText('Loading devices...')).toBeInTheDocument();
    });

    test('displays error message on error', () => {
        useFetchData.mockReturnValue({
             data: [], loading: false, error: new Error('Failed to fetch') });

        render(<EventGrid />);

        // Assert that the error message is displayed correctly.
        expect(screen.getByText(/Failed to load devices\.\s*Please try again later\./)).toBeInTheDocument();
    });

    test('renders the data grid with the fetched data', async () => {
        const moveTime = '2024-11-03T23:12:17.840Z';
        
        useFetchData.mockReturnValue({
            data: [
                { 
                    dev_id: 1, 
                    user_name: '020202', 
                    move_time: moveTime,
                    move_time_iso: new Date(Date.parse(moveTime)).toISOString(),
                    loc_name: 'Test Laboratory' 
                },
            ],
            loading: false,
            error: null,
        });

        render(<EventGrid />);

        // Cells
        expect(screen.getByText('020202')).toBeInTheDocument();
        // Testing that UTC to GMT+2 date conversion works
        expect(screen.getByText('04/11/2024, 01:12') || 
                // Hack to test daylight saving time. Close enough.
               screen.getByText('04/11/2024, 02:12')).toBeInTheDocument(); 
        expect(screen.getByText('Test Laboratory')).toBeInTheDocument();

        // Headers
        expect(screen.getByText('Device id')).toBeInTheDocument();
        expect(screen.getByText('User name')).toBeInTheDocument();
        expect(screen.getByText('Date/Time')).toBeInTheDocument();
        expect(screen.getByText('Location')).toBeInTheDocument();
    });

});