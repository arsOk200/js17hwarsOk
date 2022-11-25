import React from 'react';
import './Countre-item.css';
interface Props{
  name:string;
  onClick:React.MouseEventHandler;
}

const CountryItem:React.FC<Props> = ({name,onClick}) => {
  return (
    <div className='border-primary C-item p-1' onClick={onClick}>
      <p className='p-0 m-0'>{name}</p>
    </div>
  );
};

export default CountryItem;