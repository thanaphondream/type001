import express from 'express';
const router = express.Router();
import * as booking  from '../work-all/stall-Bookings'
import { authenticates } from '../auth/authenticate';

router.post('/booking',authenticates, booking.bookingsbody, booking.bookingsSave)
router.get('/bookings', booking.bookingGit_all)
router.put('/booking/:booking', authenticates, booking.bookingsbody, booking.bookingsId, booking.bookings_Update)
router.get('/bookingShowUser', authenticates, booking.Booking_User_Show)
router.put('/booking/updeat/status/:id',booking.bookingsId, booking.Booking_UpdateStatus)

export default router;