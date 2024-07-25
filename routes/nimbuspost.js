const router = require('express').Router();
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const fedexApiKey = process.env.FEDEX_API_KEY;
const fedexApiSecret = process.env.FEDEX_API_SECRET;
const fedexAccountNumber = process.env.FEDEX_ACCOUNT_NUMBER;
const fedexMeterNumber = process.env.FEDEX_METER_NUMBER;
const fedexApiUrl = process.env.FEDEX_API_URL;

// FedEx API Authentication
const auth = Buffer.from(`${fedexApiKey}:${fedexApiSecret}`).toString('base64');

// Endpoint to create a shipment
router.post('/create-shipment', async (req, res) => {
    const { shipmentDetails } = req.body;

    if (!shipmentDetails) {
        return res.status(400).json({ error: 'Shipment details are required.' });
    }

    try {
        const response = await createFedExShipment(shipmentDetails);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error creating shipment.', details: error.message });
    }
});

// Endpoint to track a shipment
router.post('/track', async (req, res) => {
    const { trackingNumber } = req.body;

    if (!trackingNumber) {
        return res.status(400).json({ error: 'Tracking number is required.' });
    }

    try {
        const response = await trackFedEx(trackingNumber);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error tracking package.', details: error.message });
    }
});

// Function to create a FedEx shipment
async function createFedExShipment(shipmentDetails) {
    const requestBody = {
        requestedShipment: {
            shipper: shipmentDetails.shipper,
            recipient: shipmentDetails.recipient,
            shipTimestamp: new Date().toISOString(),
            serviceType: shipmentDetails.serviceType,
            packagingType: shipmentDetails.packagingType,
            labelSpecification: {
                labelFormatType: 'COMMON2D',
                imageType: 'PDF',
                labelStockType: 'PAPER_4X6'
            },
            rateRequestTypes: ['LIST'],
            packageCount: '1',
            requestedPackageLineItems: [
                {
                    weight: {
                        units: shipmentDetails.packageWeight.units,
                        value: shipmentDetails.packageWeight.value
                    },
                    dimensions: {
                        length: shipmentDetails.packageDimensions.length,
                        width: shipmentDetails.packageDimensions.width,
                        height: shipmentDetails.packageDimensions.height,
                        units: shipmentDetails.packageDimensions.units
                    }
                }
            ]
        }
    };

    return axios.post(`${fedexApiUrl}/ship/v1/shipments`, requestBody, {
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json'
        }
    });
}

// Function to track a FedEx shipment
async function trackFedEx(trackingNumber) {
    const requestBody = {
        trackingInfo: [
            {
                trackingNumberInfo: {
                    trackingNumber
                }
            }
        ]
    };

    return axios.post(`${fedexApiUrl}/track/v1/trackingnumbers`, requestBody, {
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json'
        }
    });
}




module.exports =router;