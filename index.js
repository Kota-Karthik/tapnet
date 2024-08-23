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

function buildQuestion(domainParts, recordType) {
    let qBytes = '';

    for(let part of domainParts){
        let length = part.length;
        qBytes +=  length.toString(16).padStart(2, 0);
        for(let char of part){
            qBytes +=  char.charCodeAt(0).toString(16);
        }
    }

    qBytes += '00';

    qBytes += getRecordTypeHex(recordType)

    qBytes +=  '00' + '01';

    return qBytes;
}

function getDomain(data) {
    let state = 0;
    let expectedLength = 0;
    let domainString = '';
    let domainParts = [];
    let x = 0;
    let y = 0;
    for(let pair of data.entries()){
        if (state == 1){
            domainString += String.fromCharCode(pair[1]);
            x++;
            if (x == expectedLength){
                domainParts.push(domainString);
                domainString = '';
                state = 0;
                x = 0;
            }
            if (pair[1] == 0){
                break;
            }
        }
        else{
            state = 1;
            expectedLength = pair[1];
        }
        y++;
    }
    let recordType = data.slice(y, y+2);
    return [domainParts, recordType];
}
