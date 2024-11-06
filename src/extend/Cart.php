<?php

/**
 * Cart: A very simple PHP cart library.
 *
 * Copyright (c) 2017 Sei Kan
 *
 * Distributed under the terms of the MIT License.
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright  2017 Sei Kan <seikan.dev@gmail.com>
 * @license    http://www.opensource.org/licenses/mit-license.php The MIT License
 *
 * @see       https://github.com/seikan/Cart
 */
class Cart
{
    /**
     * 购物车的唯一 ID
     *
     * @var string
     */
    protected $cartId;

    /**
     * 购物车中允许的最大商品数
     *
     * @var int
     */
    protected $cartMaxItem = 0;

    /**
     * 购物车中允许的商品的最大数量
     *
     * @var int
     */
    protected $itemMaxQuantity = 0;

    /**
     * 启用或禁用 Cookie
     *
     * @var bool
     */
    protected $useCookie = false;

    /**
     * 购物车项目的集合
     *
     * @var array
     */
    private $collection = [];

    /**
     * 折扣应用于购物车
     *
     * @var float
     */
    private $discount = 0.0;

    /**
     * 购物车的运费
     *
     * @var float
     */
    private $shippingCost = 0.0;

    /**
     * 单例设计模式
     * @var object
     */
    private static $_instance;

    public static function new($path = null)
    {
        if ( ! (self::$_instance instanceof self) )
        {
            self::$_instance = new self($path);
        }

        return self::$_instance;
    }

    /**
     * 初始化购物车
     *
     * @param array $options
     */
    private function __construct($options = [])
    {
        if (!session_id()) {
            session_start();
        }

        if (isset($options['cartMaxItem']) && preg_match('/^\d+$/', $options['cartMaxItem'])) {
            $this->cartMaxItem = $options['cartMaxItem'];
        }

        if (isset($options['itemMaxQuantity']) && preg_match('/^\d+$/', $options['itemMaxQuantity'])) {
            $this->itemMaxQuantity = $options['itemMaxQuantity'];
        }

        if (isset($options['useCookie']) && $options['useCookie']) {
            $this->useCookie = true;
        }

        $this->cartId = md5((isset($_SERVER['HTTP_HOST'])) ? $_SERVER['HTTP_HOST'] : 'PagePanCart') . '_cart';

        $this->read();
    }

    /**
     * 获取购物车中所有商品。
     *
     * @param bool $merge 是否合并集合中的商品
     * @return array
     */
    public function getItems()
    {
        $_items = [];
        foreach ($this->collection as $items) {
            $_items = array_merge($_items, $items);
        }
        return $_items;
    }

    /**
     * 获取购物车中商品集合
     *
     * @return array
     */
    public function getCollection()
    {
        return $this->collection;
    }

    /**
     * 检查购物车是否为空
     *
     * @return bool
     */
    public function isEmpty()
    {
        return empty(array_filter($this->collection));
    }

    /**
     * 获取购物车中的商品总数
     *
     * @return int
     */
    public function getTotalItem()
    {
        $total = 0;

        foreach ($this->collection as $items) {
            foreach ($items as $item) {
                ++$total;
            }
        }

        return $total;
    }

    /**
     * 获取购物车中的商品总数。
     *
     * @return int
     */
    public function getTotalQuantity()
    {
        $quantity = 0;

        foreach ($this->collection as $items) {
            foreach ($items as $item) {
                $quantity += $item['quantity'];
            }
        }

        return $quantity;
    }

    /**
     * 获取购物车中的商品总价格。
     *
     * @return int
     */
    public function getTotalPrice()
    {
        return $this->getAttributeTotal('price');
    }

    /**
     * 获取购物车中特定属性（例如 price）的总和
     *
     * @param string $attribute
     * @return int
     */
    public function getAttributeTotal($attribute = 'price')
    {
        $total = 0;

        foreach ($this->collection as $items) {
            foreach ($items as $item) {
                if (isset($item['attributes'][$attribute])) {
                    $total += $item['attributes'][$attribute] * $item['quantity'];
                }
            }
        }

        return $total;
    }

    /**
     * 从购物车中删除所有商品
     */
    public function clear()
    {
        $this->collection = [];
        $this->write();
    }

    /**
     * 检查购物车中是否存在商品
     *
     * @param string $id
     * @param array $attributes
     *
     * @return bool
     */
    public function isItemExists($id, $attributes = [])
    {
        $attributes = (is_array($attributes)) ? array_filter($attributes) : [$attributes];

        if (isset($this->collection[$id])) {
            $hash = md5(json_encode($attributes));
            foreach ($this->collection[$id] as $item) {
                if ($item['hash'] == $hash) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * 从购物车中获取 1 件商品
     *
     * @param string $id
     * @param string $hash
     *
     * @return array
     */
    public function getItem($id, $hash = null)
    {
        if ($hash) {
            $key = array_search($hash, array_column($this->collection[$id], 'hash'));
            if ($key !== false) {
                return $this->collection[$id][$key];
            }
            return false;
        } else {
            return reset($this->collection[$id]);
        }
    }

    /**
     * 将商品添加到购物车
     *
     * @param string $id
     * @param int $quantity
     * @param array $attributes
     *
     * @return bool
     */
    public function add($id, $quantity = 1, $attributes = [])
    {
        $quantity = (preg_match('/^\d+$/', $quantity)) ? $quantity : 1;
        $attributes = (is_array($attributes)) ? array_filter($attributes) : [$attributes];
        $hash = md5(json_encode($attributes));

        if (count($this->collection) >= $this->cartMaxItem && $this->cartMaxItem != 0) {
            return false;
        }

        if (isset($this->collection[$id])) {
            foreach ($this->collection[$id] as $index => $item) {
                if ($item['hash'] == $hash) {
                    $this->collection[$id][$index]['quantity'] += $quantity;
                    $this->collection[$id][$index]['quantity'] = ($this->itemMaxQuantity < $this->collection[$id][$index]['quantity'] && $this->itemMaxQuantity != 0) ? $this->itemMaxQuantity : $this->collection[$id][$index]['quantity'];

                    $this->write();

                    return true;
                }
            }
        }

        $this->collection[$id][] = [
            'id' => $id,
            'quantity' => ($quantity > $this->itemMaxQuantity && $this->itemMaxQuantity != 0) ? $this->itemMaxQuantity : $quantity,
            'hash' => $hash,
            'attributes' => $attributes,
        ];

        $this->write();

        return true;
    }

    /**
     * 更新商品数量
     *
     * @param $id
     * @param $hash
     * @param $quantity
     * @return bool
     */
    public function update($id, $hash, $quantity = 1)
    {
        $attributes = $this->getAttributes($id, $hash);
        $quantity = (preg_match('/^\d+$/', $quantity)) ? $quantity : 1;

        if ($quantity == 0) {
            $this->remove($id, $attributes);
            return true;
        }

        if (isset($this->collection[$id])) {
            foreach ($this->collection[$id] as $index => $item) {
                if ($item['hash'] == $hash) {
                    $this->collection[$id][$index]['quantity'] = $quantity;
                    $this->collection[$id][$index]['quantity'] = ($this->itemMaxQuantity < $this->collection[$id][$index]['quantity'] && $this->itemMaxQuantity != 0) ? $this->itemMaxQuantity : $this->collection[$id][$index]['quantity'];
                    $this->write();
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 通过 hash 更新购特定商品的数量
     *
     * @param $hash
     * @param $quantity
     * @return bool
     */
    public function updateByHash($hash, $quantity = 1)
    {
        $bool = false;
        foreach ($this->collection as $id => $items) {
            $item = $this->getItem($id, $hash);
            if ($item) {
                $bool = $this->update($id, $hash, $quantity);
                break;
            }
        }
        return $bool;
    }

    /**
     * 获取购物车中特定商品的属性
     *
     * @param $id
     * @param $hash
     * @return array|mixed
     */
    public function getAttributes($id, $hash)
    {
        $item = $this->getItem($id, $hash);
        if ($item) {
            return $item['attributes'];
        }
        return [];
    }

    /**
     * 更新购物车中特定商品的属性
     *
     * @param string $id
     * @param string $hash
     * @param array $attributes
     *
     * @return bool
     */
    public function updateAttributes($id, $hash, $attributes = [])
    {
        if (isset($this->collection[$id])) {
            foreach ($this->collection[$id] as $index => $item) {
                if ($item['hash'] == $hash) {
                    foreach ($attributes as $key => $value) {
                        $this->collection[$id][$index]['attributes'][$key] = $value;
                    }
                    $this->write();
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 从购物车中删除商品
     *
     * @param string $id
     * @param array $attributes
     *
     * @return bool
     */
    public function remove($id, $hash)
    {
        $attributes = $this->getAttributes($id, $hash);

        if (isset($this->collection[$id])) {
            if (empty($attributes)) {
                unset($this->collection[$id]);
            } else {
                foreach ($this->collection[$id] as $index => $item) {
                    if ($item['hash'] == $hash) {
                        unset($this->collection[$id][$index]);
                        if (empty($this->collection[$id])) {
                            unset($this->collection[$id]);
                        }
                    }
                }
            }

            $this->write();

            return true;
        }

        return false;
    }

    /**
     * 将折扣代码应用于购物车
     *
     * @param string $code
     * @param float $amount
     */
    public function applyDiscount($code, $amount)
    {
        $this->discount = $amount;
    }

    /**
     * 应用折扣后获取总额.
     *
     * @return float
     */
    public function getTotalWithDiscount()
    {
        return $this->getAttributeTotal('price') - $this->discount;
    }

    /**
     * 设置购物车的运费
     *
     * @param float $cost
     */
    public function setShippingCost($cost)
    {
        $this->shippingCost = $cost;
    }

    /**
     * 获取添加运费后的总额
     *
     * @return float
     */
    public function getTotalWithShipping()
    {
        return $this->getTotalWithDiscount() + $this->shippingCost;
    }

    /**
     * 将购物车保存到数据库以进行持久会话
     *
     * @param int $userId
     */
    public function saveToDatabase($userId)
    {
        $cartData = serialize($this->collection);
        // Save $cartData to the database associated with the $userId.
    }

    /**
     * 从数据库加载 cart 以进行持久会话
     *
     * @param int $userId
     */
    public function loadFromDatabase($userId)
    {
        // Fetch cart data from the database for the given $userId.
        // Example: $cartData = fetch_cart_data($userId);
        // $this->collection = unserialize($cartData);
    }

    /**
     * 将购物车数据保存到会话或 Cookie
     */
    protected function write()
    {
        if ($this->useCookie) {
            setcookie($this->cartId, json_encode($this->collection), time() + 604800, '/');
        } else {
            $_SESSION[$this->cartId] = $this->collection;
        }
    }

    /**
     * 从会话或 Cookie 中读取购物车数据
     */
    protected function read()
    {
        $this->collection = ($this->useCookie && isset($_COOKIE[$this->cartId])) ? json_decode($_COOKIE[$this->cartId], true) : ((isset($_SESSION[$this->cartId])) ? $_SESSION[$this->cartId] : []);
    }
}
