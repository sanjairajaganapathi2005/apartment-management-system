const ParkingSlotSchema = new mongoose.Schema({
    slotNo: { type: String, required: true },
    roomNo: String,
    bookedBy: String, 
    bookingDate: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('ParkingSlot', ParkingSlotSchema);
  