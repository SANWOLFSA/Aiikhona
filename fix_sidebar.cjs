const fs = require('fs');

let sidebar = fs.readFileSync('src/components/Sidebar.tsx', 'utf-8');
sidebar = sidebar.replace("{ id: 'devices', label: 'Devices', icon: Smartphone, description: 'Repair guides & diagnostics' },", "{ id: 'phones', label: 'Phones Page', icon: Smartphone, description: 'AI troubleshooting & tricks', highlight: true },\n    { id: 'devices', label: 'Devices', icon: Smartphone, description: 'Repair guides & diagnostics' },");
fs.writeFileSync('src/components/Sidebar.tsx', sidebar);

