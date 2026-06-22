import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Item, ItemCategory } from "@/types/item";

const COL = "items";

export async function getItemsByCategory(category: ItemCategory): Promise<Item[]> {
  const q = query(
    collection(db, COL),
    where("category", "==", category),
    where("status", "==", "approved"),
    orderBy("name")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Item));
}

export async function getItemById(id: string): Promise<Item | null> {
  const snap = await getDoc(doc(db, COL, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Item;
}

export async function getAllItems(): Promise<Item[]> {
  const snap = await getDocs(collection(db, COL));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Item));
}

export async function addItem(data: Omit<Item, "id" | "createdAt" | "updatedAt">) {
  return addDoc(collection(db, COL), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateItem(id: string, data: Partial<Item>) {
  return updateDoc(doc(db, COL, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteItem(id: string) {
  return deleteDoc(doc(db, COL, id));
}
