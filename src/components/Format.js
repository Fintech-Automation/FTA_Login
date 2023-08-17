import React from "react";
import Tag from "antd/es/tag";


export const CurrencyFormat = (money) => {
    if (money != null) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            currencySign: 'accounting',
        }).format(money)
    } else {
        return null
    }
};

export const TwoDecimalFormat = (number) => {
    if (number != null && number !== 0) {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3
        }).format(number)
    } else {
        return null
    }
};

export const PercentFormat = (ratio) => {
    if (ratio != null && ratio !== 0) {
        return new Intl.NumberFormat('en-US', {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(ratio);
    } else {
        return null
    }
}

export const NegativeRed = (e) => {
    if (e && (e.startsWith('-') || e.startsWith('('))) {
        return <div style={{ color: 'red' }}>
            {e}
        </div>;
    } else {
        return <div style={{ color: 'green' }}>
            {e}
        </div>;
    }
}

export const FormatDate = (e) => {
    return new Intl.DateTimeFormat('en-US').format(new Date(e));
}

export const Today = () => {
    return new Intl.DateTimeFormat('en-US').format(new Date());
}

export const RenderTag = (e) => {
    return <>
        {e.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            return (
                <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                </Tag>
            )
        })}
    </>
}
