import { formatPurchaseAmount } from '@/lib/youtube';
import { SuperChatAmountPerCurrencyUnit } from '@/types/models/chat';

export type Props = {
  superChats: SuperChatAmountPerCurrencyUnit[];
};

export const SuperChats: React.FC<Props> = ({ superChats }) => {
  return (
    <>
      {superChats
        .sort((a, b) => b.purchaseAmount - a.purchaseAmount)
        .map((superChat, i) => (
          <div
            key={i}
            className="bg-white text-black border rounded-full p-1 mr-1 my-1 text-sm float-left"
          >
            <span>{formatPurchaseAmount(superChat.currencyUnit, superChat.purchaseAmount)}</span>
          </div>
        ))}
    </>
  );
};
