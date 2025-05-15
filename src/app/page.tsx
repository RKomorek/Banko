"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal, ModalCloseButton } from "@/components/ui/modal";
import { ModeToggle } from "@/components/ui/modeToggle";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IUser } from "@/interfaces/users.interfaces";
import { fetchUsers } from "@/services/users.service";
import { useEffect, useState } from "react";


export default function Home() {
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await fetchUsers();
      if (error) {
        console.error('Erro ao buscar usuários:', error);
      } else {
        setUsers(data);
      }
    };
    fetchData();
  }, []);
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Usuários</h1>
      {users.map((user) => (
        <div key={user.id} className="p-4 border rounded-lg mb-4">
          <h2 className="text-xl font-semibold">{user.id}-{user.name}</h2>
          <p>Email: {user.email}</p>
        </div>
      ))}
    <ModeToggle />
      <div className="p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Hello, World!</h1>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>Deploy your new project in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Name of your project" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Framework</Label>
                  <Select>
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="next">Next.js</SelectItem>
                      <SelectItem value="sveltekit">SvelteKit</SelectItem>
                      <SelectItem value="astro">Astro</SelectItem>
                      <SelectItem value="nuxt">Nuxt.js</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>

         <Modal
          trigger={<Button>Abrir Modal</Button>}
          title="Título do Modal"
          description="Descrição opcional do modal."
          footer={<ModalCloseButton />}
        >
          <p>Conteúdo do modal aqui.</p>
        </Modal>
      </div>

    </main>
  );
}
