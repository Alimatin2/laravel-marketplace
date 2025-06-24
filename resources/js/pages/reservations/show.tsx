import { Breadcrumbs } from "@/components/breadcrumbs";
import ReservationHourButton from "@/components/reservation-hour-button";
import TextLink from "@/components/text-link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getDisabledDates, getHours, getTomorrow } from "@/helpers/dates";
import HomeLayout from "@/layouts/home-layout";
import { cn } from "@/lib/utils";
import { BreadcrumbItem, Reservation, SharedData, Time } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

export default function ShowReservation() {
  const { reservation, times, balance } = usePage<SharedData & {reservation: Reservation, times: Time, balance: number}>().props;

  const checkBalance = () => {
    return balance < reservation.price;
  }

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Home',
      href: '/',

    },
    {
      title: 'Reservations',
      href: '/reservations',
    },
    {
      title: reservation.name,
      href: reservation.id.toString(),
    },
  ];

  const [date, setDate] = useState<Date | undefined>(getTomorrow());
  const [selectedHour, setSelectedHour] = useState(0);
  const [hours, setHours] = useState(getHours(date, times));

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    post(route('booking.store', reservation.id));
  }

  const { post, errors, reset, setData, processing, clearErrors } = useForm({
    notes: "test",
    date: date,
    time: hours[selectedHour],
    price: reservation.price
  });

  useEffect(() => {
    setHours(getHours(date, times));
    setSelectedHour(0);
  }, [date, times]);

  return (
    <HomeLayout>
      <Head title="Reservation Schedule" />
      <Breadcrumbs breadcrumbs={breadcrumbs}/>

      <div className="max-w-7xl mx-auto p-4 space-y-6">

        <div className="space-y-1">
          <h1 className="text-3xl font-bold">{reservation.name}</h1>
          <p className="text-muted-foreground">{reservation.summary}</p>
        </div>

        <div className="flex flex-wrap justify-between gap-6">

          <div>
            <h3 className="text-lg font-semibold mb-2">Select a Date</h3>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(d) => getDisabledDates(d, times)}
              className="border rounded-xl p-2 shadow-sm w-fit"
            />
          </div>

          <div className="mx-auto max-w-xl">
            <h3 className="text-lg font-semibold mb-2">Available Times</h3>

            {hours.length > 0 ? (

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {hours.map((hour, i) => {
                    const isSelected = selectedHour === i;
                    return (
                      <ReservationHourButton 
                        key={i}
                        hour={hour}       
                        isSelected={isSelected}
                        onClick={() => setSelectedHour(i)}
                      />
                    );
                  })}
                </div>
                <Dialog>
                    <DialogTrigger className={cn(buttonVariants({ variant: "default"}), "bg-green-400 hover:bg-green-300 w-full")} disabled={checkBalance() || processing}>
                    {reservation.price.toLocaleString()}
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>
                        Are you sure you want to spend {reservation.price.toLocaleString()} to book this reservation?
                      </DialogTitle>
                      <DialogDescription>
                        Once you accept, your balance will be {(balance - reservation.price).toLocaleString()} and cannot be refunded.
                      </DialogDescription>
                      <DialogFooter>
                        <DialogClose>
                          Cancel
                        </DialogClose>
                        <DialogClose asChild>
                          <Button className="bg-green-400 hover:bg-green-300" onClick={handleSubmit} disabled={checkBalance() || processing}>{reservation.price.toLocaleString()}</Button>
                        </DialogClose>       
                      </DialogFooter>
                    </DialogContent>
                </Dialog>
                
                {
                  checkBalance() &&
                  <p>You don't have enough balance. <TextLink href={route('wallet')}>Increase your balance here.</TextLink></p>
                }
              </div>
            ) : (
              <div className="text-muted-foreground italic">No available times</div>
            )}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}