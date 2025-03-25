const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointment"); // Ensure you have an Appointment model

// 
router.post("/book", async (req, res) => {
    try {
        const { patientName, doctorName, date, time } = req.body;
        const newAppointment = new Appointment({ patientName, doctorName, date, time });
        await newAppointment.save();
        res.status(201).json({ message: "Appointment booked successfully", newAppointment });
    } catch (error) {
        res.status(500).json({ message: "Error booking appointment", error });
    }
});

// 
router.get("/", async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching appointments", error });
    }
});

// 
router.put("/:id", async (req, res) => {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Appointment updated successfully", updatedAppointment });
    } catch (error) {
        res.status(500).json({ message: "Error updating appointment", error });
    }
});

// 
router.delete("/:id", async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: "Appointment canceled successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error canceling appointment", error });
    }
});

module.exports = router;
