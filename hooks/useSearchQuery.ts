import { User } from '@/generated/prisma';
import { create } from 'zustand';

interface IUseSearchQueryStore {
	q: string;
	setQ: (value: string) => void;
	activeUser: User | null;
	setActiveUser: (user: User | null) => void;
}

const useSearchQueryStore = create<IUseSearchQueryStore>()((set) => ({
	q: '',
	setQ: (value) => set({ q: value }),
	activeUser: null,
	setActiveUser: (user) => set({ activeUser: user }),
}));

export default useSearchQueryStore;
