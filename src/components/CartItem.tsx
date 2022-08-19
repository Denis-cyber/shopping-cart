import React from "react";
import { Stack, Button } from "react-bootstrap";
import { CartItem as CartItemProps, useShoppingCard } from "../context/ShoppingCardContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

export const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeFromCard } = useShoppingCard();
  const item = storeItems.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <Stack direction='horizontal' gap={2} className='d-flex align-items-center'>
      <img
        src={item.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
        alt='img'
      />
      <div className='me-auto'>
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className='text-muted' style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className='text-muted' style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div> {formatCurrency(item.price * quantity)}</div>
      <Button variant='outline-danger' size='sm' onClick={() => removeFromCard(item.id)}>
        &times;
      </Button>
    </Stack>
  );
};
