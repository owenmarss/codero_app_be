const db = require("../models");
const Transport = db.transport;
const PublicTransport = db.publicTransport;
const PrivateTransport = db.privateTransport;

const PublicTransportData = db.publicTransportData; 
const PrivateTransportData = db.privateTransportData;

const Op = db.Sequelize.Op;

// Choose the transport type
exports.chooseTransportType = async (req, res) => {
    const attendance_id = req.params.attendanceId;
    const transport_type = req.body.data;

    try {
        const transportUpdate = await Transport.update(
            { transport_type: transport_type },
            { where: { attendance_id: attendance_id }, returning: true, plain: true }
        );

        if(transportUpdate[1] === 0) {
           return res.status(404).send({
                message: "Transport not found for the provided attendance ID"
            });
        }

        const transport = await Transport.findOne({ where: { attendance_id: attendance_id } });

        if(!transport) {
            return res.status(404).send({
                message: "Transport record could not be retrieved after update"
            });
        }

        if(transport_type === "Public") {
            await PublicTransport.create({
                transport_id: transport.id,
                total_stop: null,
                total_cost: null
            })
        } 
        else if (transport_type === "Private") {
            await PrivateTransport.create({
                transport_id: transport.id,
                license_number: null
            })
        }
        else {
            return res.status(400).send({
                message: "Invalid transport type"
            });
        }

        res.status(200).send({
            message: `Transport type has been assign to ${transport_type} and associated data has been created successfully`
        });
    } catch {
        console.log("Error in chooseTransportType: ", error);
        res.status(500).send({
            message: "Error updating transport type and creating associated data"
        });
    }
};

// Create and Save a new Public Transport
exports.createPublicTransportData = async (req, res) => {
    const { total_stop } = req.body.data;
};