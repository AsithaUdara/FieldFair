import { QRCodeData, Product, Order } from '@/types';

// Generate QR code data for products
export function generateProductQR(product: Product): QRCodeData {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fieldfair.lk';
  
  return {
    type: 'product',
    id: product.id,
    url: `${baseUrl}/products/${product.id}`,
    data: {
      id: product.id,
      name: product.name,
      farmerId: product.farmerId,
      farmerName: product.farmerName,
      farmLocation: product.farmLocation,
      harvestDate: product.harvestDate,
      isOrganic: product.isOrganic,
      price: product.price,
      unit: product.unit
    },
    timestamp: new Date().toISOString()
  };
}

// Generate QR code data for orders
export function generateOrderQR(order: Order): QRCodeData {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fieldfair.lk';
  
  return {
    type: 'order',
    id: order.id,
    url: `${baseUrl}/track/${order.id}`,
    data: {
      id: order.id,
      status: order.status,
      total: order.total,
      orderDate: order.orderDate,
      deliveryDate: order.deliveryDate,
      items: order.items.map(item => ({
        productName: item.product.name,
        quantity: item.quantity,
        farmerName: item.product.farmerName
      }))
    },
    timestamp: new Date().toISOString()
  };
}

// Generate QR code data for farm visits
export function generateFarmVisitQR(farmId: string, visitDate: string): QRCodeData {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fieldfair.lk';
  
  return {
    type: 'farm',
    id: farmId,
    url: `${baseUrl}/farms/${farmId}/visit?date=${visitDate}`,
    data: {
      farmId,
      visitDate,
      purpose: 'visit'
    },
    timestamp: new Date().toISOString()
  };
}

// Parse QR code data
export function parseQRData(qrString: string): QRCodeData | null {
  try {
    const data = JSON.parse(qrString);
    
    // Validate QR data structure
    if (!data.type || !data.id || !data.url || !data.data) {
      return null;
    }
    
    // Validate type
    if (!['product', 'order', 'farm'].includes(data.type)) {
      return null;
    }
    
    return data as QRCodeData;
  } catch (error) {
    console.error('Error parsing QR code:', error);
    return null;
  }
}

// Validate QR code
export function validateQRCode(qrData: QRCodeData): boolean {
  if (!qrData.type || !qrData.id || !qrData.url || !qrData.data) {
    return false;
  }
  
  switch (qrData.type) {
    case 'product':
      return validateProductQR(qrData);
    case 'order':
      return validateOrderQR(qrData);
    case 'farm':
      return validateFarmQR(qrData);
    default:
      return false;
  }
}

// Validate product QR
function validateProductQR(qrData: QRCodeData): boolean {
  const { data } = qrData;
  return !!(
    data.id &&
    data.name &&
    data.farmerId &&
    data.farmerName &&
    data.harvestDate
  );
}

// Validate order QR
function validateOrderQR(qrData: QRCodeData): boolean {
  const { data } = qrData;
  return !!(
    data.id &&
    data.status &&
    data.total &&
    data.orderDate &&
    Array.isArray(data.items)
  );
}

// Validate farm QR
function validateFarmQR(qrData: QRCodeData): boolean {
  const { data } = qrData;
  return !!(data.farmId);
}

// Generate tracking URL from QR data
export function getTrackingUrl(qrData: QRCodeData): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fieldfair.lk';
  
  switch (qrData.type) {
    case 'product':
      return `${baseUrl}/products/${qrData.id}`;
    case 'order':
      return `${baseUrl}/track/${qrData.id}`;
    case 'farm':
      return `${baseUrl}/farms/${qrData.id}`;
    default:
      return baseUrl;
  }
}

// Download QR code as image
export function downloadQRImage(qrElement: SVGElement, filename: string): void {
  try {
    const svgData = new XMLSerializer().serializeToString(qrElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    
    // Create canvas to convert SVG to PNG
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Fill white background
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      }
      
      // Convert to PNG and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${filename}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }, 'image/png');
    };
    
    img.src = URL.createObjectURL(svgBlob);
  } catch (error) {
    console.error('Error downloading QR code:', error);
  }
}

// Share QR code via Web Share API
export async function shareQRCode(qrData: QRCodeData): Promise<boolean> {
  if (!navigator.share) {
    return false;
  }
  
  try {
    await navigator.share({
      title: `FieldFair ${qrData.type}`,
      text: `Check out this ${qrData.type} on FieldFair`,
      url: qrData.url
    });
    return true;
  } catch (error) {
    console.error('Error sharing QR code:', error);
    return false;
  }
}

// Generate QR code for supply chain step
export function generateSupplyChainQR(
  orderId: string,
  stepId: string,
  location: string
): QRCodeData {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fieldfair.lk';
  
  return {
    type: 'order',
    id: `${orderId}_${stepId}`,
    url: `${baseUrl}/supply-chain/${orderId}?step=${stepId}`,
    data: {
      orderId,
      stepId,
      location,
      timestamp: new Date().toISOString(),
      scanType: 'supply_chain'
    },
    timestamp: new Date().toISOString()
  };
}

// Check if device supports camera for QR scanning
export function isCameraSupported(): boolean {
  return !!(
    navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia
  );
}

// Get QR scanner constraints for mobile
export function getQRScannerConstraints(): MediaStreamConstraints {
  return {
    video: {
      facingMode: 'environment', // Use back camera
      width: { ideal: 1280 },
      height: { ideal: 720 }
    }
  };
}

// Format QR data for display
export function formatQRDataForDisplay(qrData: QRCodeData): {
  title: string;
  subtitle: string;
  details: Array<{label: string, value: string}>;
} {
  switch (qrData.type) {
    case 'product':
      return {
        title: qrData.data.name,
        subtitle: `From ${qrData.data.farmerName}`,
        details: [
          { label: 'Farm Location', value: qrData.data.farmLocation },
          { label: 'Harvest Date', value: qrData.data.harvestDate },
          { label: 'Price', value: `LKR ${qrData.data.price}/${qrData.data.unit}` },
          { label: 'Organic', value: qrData.data.isOrganic ? 'Yes' : 'No' }
        ]
      };
      
    case 'order':
      return {
        title: `Order #${qrData.data.id}`,
        subtitle: `Status: ${qrData.data.status}`,
        details: [
          { label: 'Order Date', value: qrData.data.orderDate },
          { label: 'Delivery Date', value: qrData.data.deliveryDate },
          { label: 'Total', value: `LKR ${qrData.data.total}` },
          { label: 'Items', value: `${qrData.data.items.length} products` }
        ]
      };
      
    case 'farm':
      return {
        title: 'Farm Visit',
        subtitle: `Farm ID: ${qrData.data.farmId}`,
        details: [
          { label: 'Visit Date', value: qrData.data.visitDate },
          { label: 'Purpose', value: qrData.data.purpose }
        ]
      };
      
    default:
      return {
        title: 'Unknown QR Code',
        subtitle: 'Cannot parse QR data',
        details: []
      };
  }
}