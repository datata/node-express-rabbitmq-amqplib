import { connect as _connect } from 'amqplib';

const connectionOptions = {
  hostname: 'rabbitmq',
  port: 5672,
  username: 'datata',
  password: '12345',
  authMechanism: 'PLAIN',
};

const connect = async() => {
  try {
    const connection = await _connect(connectionOptions);
    const channel = await connection.createChannel();
    
    return { connection, channel };
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error.message);
    throw error;
  }
}

const sendMessage = async (channel, queue, message) => {
  try {
    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(message));
    console.log(`Message sent to queue ${queue}: ${message}`);
  } catch (error) {
    console.error('Error sending message to RabbitMQ:', error.message);
  }
}

function consumeMessage(channel, queue, callback) {
  channel.assertQueue(queue, { durable: false });
  channel.consume(queue, (msg) => {
    if (msg !== null) {
      const message = msg.content.toString();
      callback(message);
    }
  }, { noAck: true });
}

export default { 
  connect,
  sendMessage,
  consumeMessage 
};