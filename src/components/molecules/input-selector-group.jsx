import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useGetAllProducts from '../db/use-get-all-products';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
        personName.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

export default function InputSelectorGroup({ value = [], onChange }) {
    const {data} = useGetAllProducts()
    const theme = useTheme();

    // اطمینان از اینکه value یک آرایه است
    const safeValue = Array.isArray(value) ? value : [];

    return (
        <div>
        <FormControl sx={{ width: '100%' }}>
            <InputLabel id="demo-multiple-name-label">انتخاب اسامی</InputLabel>
            <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={safeValue}
            onChange={onChange}
            input={<OutlinedInput label="انتخاب اسامی" />}
            MenuProps={MenuProps}
            sx={{ outline: 'none', width: '100%' }}
            renderValue={(selected) =>
            selected.length > 0
                ? selected?.map((id) => {
                        const product = data?.data?.find((product) => product.id === id);
                        return product ? product.name : null;
                    })
                    .filter(Boolean)
                    .join(', ')
                : 'هیچ محصولی انتخاب نشده'
            }
            >
            {data?.data?.map((name) => (
                <MenuItem
                key={name.id}
                value={name.id}
                style={getStyles(name.id, safeValue, theme)}
                >
                {name?.name}
                </MenuItem>
            ))}
            </Select>
        </FormControl>
        </div>
    );
}