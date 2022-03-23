import {MessageModel} from '../components/models'

export function getMessagesByChannel(messages: Array<MessageModel>, channel_id: number): Array<MessageModel>{
    return messages.filter(item => item.channel_id === channel_id);
}