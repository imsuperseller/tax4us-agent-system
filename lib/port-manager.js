const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

class PortManager {
  constructor() {
    this.availablePorts = [];
    this.usedPorts = [];
    this.portRange = { start: 3000, end: 4000 };
  }

  async findAvailablePorts(startPort = 3111, endPort = 3200) {
    console.log(`🔍 Scanning ports ${startPort}-${endPort} for availability...`);
    
    const availablePorts = [];
    
    for (let port = startPort; port <= endPort; port++) {
      try {
        const { stdout } = await execAsync(`lsof -i :${port}`);
        if (!stdout.trim()) {
          availablePorts.push(port);
          console.log(`✅ Port ${port} is available`);
        } else {
          console.log(`❌ Port ${port} is in use`);
        }
      } catch (error) {
        // Port is available if lsof returns no output
        availablePorts.push(port);
        console.log(`✅ Port ${port} is available`);
      }
    }
    
    this.availablePorts = availablePorts;
    return availablePorts;
  }

  async getFirstAvailablePort(startPort = 3111, endPort = 3200) {
    const availablePorts = await this.findAvailablePorts(startPort, endPort);
    return availablePorts[0] || null;
  }

  async checkPortAvailability(port) {
    try {
      const { stdout } = await execAsync(`lsof -i :${port}`);
      return !stdout.trim();
    } catch (error) {
      return true; // Port is available
    }
  }

  getPortStatus() {
    return {
      available: this.availablePorts,
      recommended: this.availablePorts.slice(0, 5), // Top 5 recommended ports
      totalAvailable: this.availablePorts.length
    };
  }

  async documentPorts() {
    const status = this.getPortStatus();
    const documentation = {
      timestamp: new Date().toISOString(),
      portStatus: status,
      recommendations: {
        primary: status.recommended[0] || 3111,
        backup: status.recommended[1] || 3112,
        development: status.recommended[2] || 3113
      },
      usage: {
        tax4us: status.recommended[0] || 3111,
        development: status.recommended[1] || 3112,
        testing: status.recommended[2] || 3113
      }
    };

    console.log('📋 Port Documentation:');
    console.log(JSON.stringify(documentation, null, 2));
    
    return documentation;
  }
}

module.exports = PortManager;
