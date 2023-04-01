import {db} from "../database.js"

// Get all orders
export async function getOrders() {
    const sql = "select * from `Order`";
    const [results] = await db.query(sql);
  
    return results
}

// Get a order by id
export async function getOrderById(id) {
    const sql = `
      select *
      from \`Order\`
      where orderID = ?
    `;
    const [rows] = await db.query(sql, [id]);

    rows[0].order_date = rows[0].order_date.toLocaleDateString('fr-CA');
    rows[0].desired_date = rows[0].desired_date.toLocaleDateString('fr-CA');

    return rows[0];
}

// Create a order
export async function createOrder(customerID, cakesID, referralID, details, desiredDate) {
    const sql = `
      insert into \`Order\` (customerID, cakesID, referralID, cake_details, desired_date)
      values (?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [customerID, cakesID, referralID, details, desiredDate]);
    const id = result.insertId;
  
    return getOrderById(id);
}

// Update an order by id
export async function updateOrderById(orderID, status, pickup) {
    const sql = `
      update \`Order\`
      set statusID = ?,
      pick_up_details = ?
      where orderID = ?
    `;
    const [result] = await db.query(sql, [status, pickup, orderID]);
    
    return getOrderById(orderID);
}

// Update an order's status by id
export async function updateOrderStatusById(orderID, status) {
    const sql = `
      update \`Order\`
      set statusID = ?
      where orderID = ?
    `;
    const [result] = await db.query(sql, [status, orderID]);
    
    return getOrderById(orderID);
}

// Get Order View for Admin Order Table
export async function getAdminOrderView() {
    const sql = `
        select \`Order\`.orderID, \`Order\`.order_date, \`Order\`.customerID,
        Customer.first_name, Customer.last_name, Customer.email, Customer.phone,
        Cake_Type.type, Cake_Flavor.flavor,
        \`Order\`.cake_details, \`Order\`.statusID, Order_Status.description,
        \`Order\`.desired_date, \`Order\`.pick_up_details
        from \`Order\`
        Inner join Order_Status
        On \`Order\`.statusID = Order_Status.statusID
        Inner join Customer
        On \`Order\`.customerID = Customer.customerID
        Inner join Product_Menu
        On \`Order\`.cakesID = Product_Menu.cakesID
        Inner join Cake_Type
        On Product_Menu.typeID = Cake_Type.typeID
        Inner join Cake_Flavor
        On Product_Menu.flavorID = Cake_Flavor.flavorID
    `;
    const [results] = await db.query(sql);
    
    results.forEach((item) => {
        item.order_date = item.order_date.toLocaleDateString('fr-CA');
        item.desired_date = item.desired_date.toLocaleDateString('fr-CA');
    });

    return results
}

// Get Order Status Descriptions from status table
export async function getOrderStatusDescriptions() {
    const sql = "select * from Order_Status";
    const [results] = await db.query(sql);
  
    return results
}

// Get a Customer's order history
export async function getCustomerOrders(customerID) {
    const sql = `
    select \`Order\`.orderID, \`Order\`.order_date, \`Order\`.customerID,
    Cake_Type.type, Cake_Flavor.flavor,
    \`Order\`.cake_details, \`Order\`.statusID, Order_Status.description, \`Order\`.desired_date, \`Order\`.pick_up_details
    from \`Order\`
    Inner join Order_Status
    	On \`Order\`.statusID = Order_Status.statusID
    Inner join Product_Menu
    	On \`Order\`.cakesID = Product_Menu.cakesID
    Inner join Cake_Type
    	On Product_Menu.typeID = Cake_Type.typeID
    Inner join Cake_Flavor
    	On Product_Menu.flavorID = Cake_Flavor.flavorID
    where \`Order\`.customerID = ?;
    `;
    const [results] = await db.query(sql, [customerID]);

    results.forEach((item) => {
        item.order_date = item.order_date.toLocaleDateString('fr-CA');
        item.desired_date = item.desired_date.toLocaleDateString('fr-CA');
    });
  
    return results
}