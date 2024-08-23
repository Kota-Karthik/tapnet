import dgram from 'dgram';

const server = dgram.createSocket('udp4');

server.bind(53);

server.on('message', async (msg, rinfo) => {
    let TID = msg.slice(0,2);
    let FLAGS = getFlags(msg.slice(2, 4));

    FLAGS = new Buffer.from(parseInt(FLAGS,2).toString(16), 'hex');

    let QDCOUNT = new Buffer.from('0001', 'hex');
    
    let recordsResult;
    let qt;
    let domainParts;
    let askedRecord;
    [recordsResult, qt, domainParts, askedRecord] = await getRecords(msg.slice(12));
    
    let askedRecords = recordsResult[qt].filter(ele => ele.name == askedRecord);    
    

    let ANCOUNT = askedRecords.length.toString(16).padStart(4,0);
    
    ANCOUNT = new Buffer.from(ANCOUNT, 'hex');

    let NSCOUNT = new Buffer.from('0000', 'hex');

    let ARCOUNT = new Buffer.from('0000', 'hex');

    let domainQuestion = new Buffer.from(buildQuestion(domainParts, qt), 'hex');
    
    let dnsBody = '';

    for (let record of askedRecords) {
        dnsBody += recordToBytes( qt, record); 
    }

    dnsBody = new Buffer.from(dnsBody, 'hex');


    server.send([TID,FLAGS, QDCOUNT, ANCOUNT, NSCOUNT, ARCOUNT, domainQuestion, dnsBody], rinfo.port)
});
