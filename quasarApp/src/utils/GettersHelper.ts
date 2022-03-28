import { ChannelModel, MessageModel } from '../components/models'

export function getMessagesByChannel (messages: Array<MessageModel>, channel_id: number): Array<MessageModel> {
    return messages.filter(item => item.channel_id === channel_id);
}

export function getChannelByID (channel_id: number): ChannelModel {
    return {
        id: channel_id,
        name: 'huh',
        owner_id: 0,
        private: false,
        state: null,
    }
}
