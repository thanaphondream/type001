import express from 'express';
const router = express.Router();
import * as booking  from '../work-all/stall-Bookings'
import { authenticates } from '../auth/authenticate';

router.post('/booking',authenticates, booking.bookingsbody, booking.bookingsSave)
router.get('/bookings', booking.bookingGit_all)
router.put('/booking/:booking', authenticates, booking.bookingsbody, booking.bookingsId, booking.bookings_Update)

export default router;