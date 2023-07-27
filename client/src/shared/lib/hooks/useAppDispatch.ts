import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/providers/StoreProvider';

export const useAppDispatch = () => useDispatch<AppDispatch>();
