import * as React from 'react';
import { DataTable } from 'react-native-paper';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CourseDataTable = () => {
    const { t } = useTranslation();
    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );

    const [items] = useState([
        {
            key: "",
            courseName: "",
            branch: "",
            duration: "",
            grade: "",
            endDate: "",
            instructor: "",
        },
    ]);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    return (
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>{t('course')}</DataTable.Title>
                <DataTable.Title>{t('branch')}</DataTable.Title>
                <DataTable.Title>{t('duration')}</DataTable.Title>
                <DataTable.Title>{t('grade')}</DataTable.Title>
                <DataTable.Title>{t('endDate')}</DataTable.Title>
                <DataTable.Title>{t('instructor')}</DataTable.Title>
            </DataTable.Header>

            {items.slice(from, to).map((item) => (
                <DataTable.Row key={item.key}>
                    <DataTable.Cell>{item.courseName}</DataTable.Cell>
                    <DataTable.Cell>{item.branch}</DataTable.Cell>
                    <DataTable.Cell>{item.duration}</DataTable.Cell>
                    <DataTable.Cell>{item.grade}</DataTable.Cell>
                    <DataTable.Cell>{item.endDate}</DataTable.Cell>
                    <DataTable.Cell>{item.instructor}</DataTable.Cell>
                </DataTable.Row>
            ))}

            <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(items.length / itemsPerPage)}
                onPageChange={(page) => setPage(page)}
                label={`${from + 1}-${to} of ${items.length}`}
                numberOfItemsPerPageList={numberOfItemsPerPageList}
                numberOfItemsPerPage={itemsPerPage}
                onItemsPerPageChange={onItemsPerPageChange}
                showFastPaginationControls
                selectPageDropdownLabel={'Rows per page'}
            />
        </DataTable>
    );
};

export default CourseDataTable;