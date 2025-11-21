import {useNavigationStore} from '../../store/navigationStore';

const pageNames = {
    control: 'Керування',
    view: 'Перегляд',
    settings: 'Налаштування',
};

export default function Header() {
    const {currentPage} = useNavigationStore();

    return (
        <header className="bg-white border-b border-gray-200 px-8 py-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-normal text-gray-800">
                    {pageNames[currentPage]}
                </h1>
                <div className="flex items-center gap-4">
                </div>
            </div>
        </header>
    );
}