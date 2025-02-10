import React, { ReactNode } from 'react';

interface Props {
    title: string;
    total: number;
    children: ReactNode;
}

const MyCardData: React.FC<Props> = ({
    title,
    total,
    children,
}) => {
    return (
        <div className="w-min rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className='flex items-center gap-4' >
                <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                    {children}
                </div>
                <span className="text-xl font-medium w-max">{title}</span>
            </div>

            <div className='mt-2 flex justify-center' >
                <h4 className="text-title-lg font-bold text-black dark:text-white ">
                    {total}
                </h4>
            </div>
        </div>
    );
};

export default MyCardData;
