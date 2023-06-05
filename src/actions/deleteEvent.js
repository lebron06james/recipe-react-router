// rrd import
import { redirect } from "react-router-dom";

// library
import { toast } from "react-toastify";

// helpers
import { deleteItem, getAllMatchingItems } from "../helpers";

export function deleteEvent({ params }) {
  try {
    deleteItem({
      key: "events",
      id: params.id,
    });

    const associatedBudgets = getAllMatchingItems({
      category: "budgets",
      key: "eventId",
      value: params.id,
    });

    associatedBudgets.forEach((budget) => {

      const associatedExpenses = getAllMatchingItems({
        category: "expenses",
        key: "budgetId",
        value: budget.id,
      });

      associatedExpenses.forEach((expense) => {
        deleteItem({
          key: "expenses",
          id: expense.id,
        });
      });

      deleteItem({
        key: "budgets",
        id: budget.id,
      });
    });

    toast.success("Event deleted successfully!");
  } catch (e) {
    throw new Error("There was a problem deleting your event.");
  }
  return redirect("/");
}
