import dgram from 'dgram';
import { fileURLToPath } from 'url';

const server = dgram.createSocket('udp4');

server.bind(53);