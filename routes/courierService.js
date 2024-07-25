const NimbusPostService = require('./nimbuspost');
const FedExService = require('./fedex');

const CourierService = {
    createShipment: async (courier, shipmentDetails) => {
        switch (courier) {
            case 'nimbuspost':
                return await NimbusPostService.createShipment(shipmentDetails);
            case 'fedex':
                return await FedExService.createShipment(shipmentDetails);
            // Add other couriers here
            default:
                throw new Error('Unsupported courier');
        }
    },
    trackShipment: async (courier, trackingId) => {
        switch (courier) {
            case 'nimbuspost':
                return await NimbusPostService.trackShipment(trackingId);
            case 'fedex':
                return await FedExService.trackShipment(trackingId);
            // Add other couriers here
            default:
                throw new Error('Unsupported courier');
        }
    }
};

module.exports = CourierService;