import { Chat } from '@/generated/prisma';
import { create } from 'zustand';

interface IUseChatStore {
	q: string;
	setQ: (value: string) => void;
	activeChat: Chat | null;
	setActiveChat: (user: Chat | null) => void;
	chatCreateIsLoading: boolean;
	setChatCreateIsLoading: (value: boolean) => void;
}

const useChatStore = create<IUseChatStore>()((set) => ({
	q: '',
	setQ: (value) => set({ q: value }),
	activeChat: null,
	setActiveChat: (chat) => set({ activeChat: chat }),
	chatCreateIsLoading: false,
	setChatCreateIsLoading: (value) => set({ chatCreateIsLoading: value }),
}));

export default useChatStore;
