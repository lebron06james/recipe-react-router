// rrd imports
import { Form, Link } from "react-router-dom";

// library imports
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/outline";

// helper functions
import {
//   calculateSpentByBudget,
  formatCurrency,
  formatPercentage,
} from "../helpers";

const EventItem = ({ event }) => {
  const { id, name, amount, color } = event;
//   const spent = calculateSpentByBudget(id);
  const spent = amount;

  return (
    <div
      className="budget"
      style={{
        "--accent": color,
      }}
    >
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Pax</p>
      </div>
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)} spent</small>
        <small>{formatCurrency(amount - spent)} remaining</small>
      </div>

      <div className="flex-sm">
        {id}
        <Link to={`/event/${id}`} className="btn">
          <span>Create Menu</span>
          <BanknotesIcon width={20} />
        </Link>
      </div>

    </div>
  );
};
export default EventItem;