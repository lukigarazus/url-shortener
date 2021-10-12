./run_docker.sh &> /dev/null &
./run_server.sh &> /dev/null &
./test_throughput.sh
OUTPUT=$?

list_descendants ()
{
  local children=$(ps -o pid= --ppid "$1")

  for pid in $children
  do
    list_descendants "$pid"
  done

  echo "$children"
}

kill $(list_descendants $$) &> /dev/null

if ((OUTPUT == 1))
then echo Fail
else echo Success
fi
exit $OUTPUT